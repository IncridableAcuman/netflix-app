package com.server.netflix.dto;

import lombok.Data;

@Data
public class MovieDto {
    private Long id;
    private String title;
    private String overview;
    private String poster_path;
    private String backdrop_path;
    private String release_date;
}
