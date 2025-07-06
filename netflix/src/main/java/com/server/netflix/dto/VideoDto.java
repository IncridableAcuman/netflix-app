package com.server.netflix.dto;

import lombok.Data;

import java.util.Date;

@Data
public class VideoDto {
    private String id;
    private String name;
    private String key;
    private String type;
    private Date published_at;
}
