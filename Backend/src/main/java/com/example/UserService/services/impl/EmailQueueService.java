package com.example.UserService.services.impl;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailQueueService {

    private static final Logger logger = LoggerFactory.getLogger(EmailQueueService.class);

    private final BlockingQueue<Runnable> queue = new LinkedBlockingQueue<>();
    private final EmailService emailService;

    private ThreadPoolTaskExecutor executor;

    @PostConstruct
    public void init() {
        executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(2);
        executor.setQueueCapacity(1000);
        executor.initialize();

        for (int i = 0; i < 2; i++) {
            executor.submit(this::processQueue);
        }
    }

    private void processQueue() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                Runnable task = queue.take();
                task.run();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            } catch (Exception e) {
                logger.error("Error processing email task", e);
            }
        }
    }

    public void addEmailTask(String to, String subject, String body) {
        queue.offer(() -> {
            try {
                emailService.send(to, subject, body);
                logger.info("Email sent to: {}", to);
            } catch (Exception e) {
                logger.error("Failed to send email to: {}", to, e);
            }
        });
    }

    @PreDestroy
    public void shutdown() {
        executor.shutdown();
    }
}
