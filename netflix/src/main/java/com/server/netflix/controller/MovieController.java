package com.server.netflix.controller;

import com.server.netflix.dto.MovieDto;
import com.server.netflix.dto.VideoDto;
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

//    get movies by category,popular,now_playing,top_rated,upcoming
    @GetMapping("/categories/{category}")
    public ResponseEntity<List<MovieDto>> getMovies(@PathVariable String category){
        return ResponseEntity.ok(movieService.getMovies(category));
    }

//    get movie by id
    @GetMapping("/get/{id}")
    public ResponseEntity<String> getMovieById(@PathVariable Long id){
        return ResponseEntity.ok(movieService.getMovieById(id));
    }
//    watch videos
    @GetMapping("/watch/videos/{id}")
    public ResponseEntity<List<VideoDto>> watchMovie(@PathVariable Long id){
        return ResponseEntity.ok(movieService.watchMovie(id));
    }
}
