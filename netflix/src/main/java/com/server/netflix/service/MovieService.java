package com.server.netflix.service;

import com.server.netflix.dto.MovieDto;
import com.server.netflix.dto.MovieListResponse;
import com.server.netflix.dto.VideoDto;
import com.server.netflix.dto.VideoResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MovieService {
    @Value("${movie.key}")
    private String key;
    @Value("${movie.tm_db_url}")
    private String url;
//    get movies
    @Transactional
    public List<MovieDto> getMovies(String category){
        RestTemplate template=new RestTemplate();
        MovieListResponse response=template.getForObject(url+"/movie/"+category+"?api_key="+key, MovieListResponse.class);
        assert response != null;
        return response.getResults();
    }

//    get popular movies
    @Transactional
    public List<MovieDto> popularMovies(){
        RestTemplate template=new RestTemplate();
        MovieListResponse response= template.getForObject(url+"/movie/popular?api_key="+key,MovieListResponse.class);
        assert response != null;
        return response.getResults();
    }
//   topRated movies

//    get movie by id
    @Transactional
    public String getMovieById(Long id){
        RestTemplate template=new RestTemplate();
        return template.getForObject(url+"/movie/"+id+"?api_key="+key, String.class);
    }
//    watch movie video
    public List<VideoDto> watchMovie(Long id){
        RestTemplate template=new RestTemplate();
        VideoResponse response=template.getForObject(url+"/movie/"+id+"/videos?api_key="+key, VideoResponse.class);
        assert response != null;
        return response.getResults();
    }
}
