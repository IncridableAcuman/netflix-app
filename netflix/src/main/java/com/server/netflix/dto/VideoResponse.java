package com.server.netflix.dto;

import lombok.Data;

import java.util.List;

@Data
public class VideoResponse
{
    private List<VideoDto> videoList;
}
