package com.server.netflix.dto;

import lombok.Data;

import java.util.List;

@Data
public class MovieListResponse {
    private List<MovieDto> results;
}
