package com.server.netflix.controller;

import com.server.netflix.dto.MovieDto;
import com.server.netflix.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;

//    get popular movies
    @GetMapping("/popular")
    public ResponseEntity<List<MovieDto>> getPopularMovies(){
        return ResponseEntity.ok(movieService.popularMovies());
    }
//    topRated
    @GetMapping("/top_rated")
    public ResponseEntity<List<MovieDto>> topRated(){
        return ResponseEntity.ok(movieService.topRated());
    }
//    upComing
    @GetMapping("/up_coming")
    public ResponseEntity<List<MovieDto>> upComing(){
        return ResponseEntity.ok(movieService.upComing());
    }
//    get movie by id
    @GetMapping("/get/{id}")
    public ResponseEntity<String> getMovieById(@PathVariable Long id){
        return ResponseEntity.ok(movieService.getMovieById(id));
    }
}
