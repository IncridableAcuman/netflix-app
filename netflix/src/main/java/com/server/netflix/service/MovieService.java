package com.server.netflix.service;

import com.server.netflix.dto.MovieDto;
import com.server.netflix.dto.MovieListResponse;
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

//    get popular movies
    @Transactional
    public List<MovieDto> popularMovies(){
        RestTemplate template=new RestTemplate();
        MovieListResponse response= template.getForObject(url+"/movie/popular?api_key="+key,MovieListResponse.class);
        assert response != null;
        return response.getResults();
    }
//   topRated movies

    @Transactional
    public List<MovieDto> topRated(){
        RestTemplate template=new RestTemplate();
        MovieListResponse response=template.getForObject(url+"/movie/top_rated?api_key="+key, MovieListResponse.class);
        assert response != null;
        return response.getResults();
    }
//    upcoming
    @Transactional
    public List<MovieDto> upComing(){
        RestTemplate template=new RestTemplate();
        MovieListResponse response = template.getForObject(url+"/movie/upcoming?api_key="+key,MovieListResponse.class);
        assert response != null;
        return response.getResults();
    }
//    get movie by id
    @Transactional
    public String getMovieById(Long id){
        RestTemplate template=new RestTemplate();
        return template.getForObject(url+"/movie/"+id+"?api_key="+key, String.class);
    }
//    now playing
    @Transactional
    public List<MovieDto> nowPLaying(){
        RestTemplate template=new RestTemplate();
        MovieListResponse response=template.getForObject(url+"/movie/now_playing?api_key="+key,MovieListResponse.class);
        assert response!=null;
        return response.getResults();
    }
//    movie reviews

}
