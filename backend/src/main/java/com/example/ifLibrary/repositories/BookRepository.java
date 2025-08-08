package com.example.ifLibrary.repositories;

import com.example.ifLibrary.models.BookModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BookRepository extends JpaRepository<BookModel, UUID> {}
