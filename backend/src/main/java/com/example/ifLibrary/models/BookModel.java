package com.example.ifLibrary.models;

import com.example.ifLibrary.DTOs.BookDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "TB_BOOK")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookModel {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String headerImage;
    private String title;
    private String blogLink;
    private String playLink;
    private String[] tags;
    private boolean finished;

    public BookModel(BookDTO data) {
        this.title = data.title();
        this.headerImage = data.headerImage();
        this.blogLink = data.blogLink();
        this.playLink = data.playLink();
        this.finished = data.finished();
        this.tags = data.tags();
    }
}
