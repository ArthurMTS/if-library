package com.example.ifLibrary.services;

import com.example.ifLibrary.DTOs.BookDTO;
import com.example.ifLibrary.models.BookModel;
import com.example.ifLibrary.repositories.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BookService {
    @Autowired
    private BookRepository repository;

    public Page<BookModel> getAll(Pageable pageable) {
        return this.repository.findAll(pageable);
    }

    public BookModel getOne(UUID id) {
        var bookO = this.repository.findById(id);
        if (bookO.isEmpty()) {
            throw new EntityNotFoundException("Book not found with id: " + id);
        }
        return bookO.get();
    }

    public BookModel create(BookDTO data) {
        var book = new BookModel(data);
        return this.repository.save(book);
    }

    public BookModel update(UUID id, BookDTO data) {
        var book = getOne(id);
        book.setTitle(data.title());
        book.setHeaderImage(data.headerImage());
        book.setPlayLink(data.playLink());
        book.setBlogLink(data.blogLink());
        book.setFinished(data.finished());
        book.setTags(data.tags());
        return this.repository.save(book);
    }

    public void delete(UUID id) {
        var book = getOne(id);
        this.repository.delete(book);
    }
}
