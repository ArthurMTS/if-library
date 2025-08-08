package com.example.ifLibrary.controllers;

import com.example.ifLibrary.DTOs.BookDTO;
import com.example.ifLibrary.models.BookModel;
import com.example.ifLibrary.services.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService service;

    @GetMapping
    public ResponseEntity<List<BookModel>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(this.service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookModel> getOne(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.service.getOne(id));
    }

    @PostMapping
    public ResponseEntity<BookModel> create(@RequestBody @Valid BookDTO data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.service.create(data));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookModel> update(@PathVariable UUID id, @RequestBody @Valid BookDTO data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.service.update(id, data));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable UUID id) {
        this.service.delete(id);
        return ResponseEntity.status(HttpStatus.CREATED).body("Book deleted successfully.");
    }
}
