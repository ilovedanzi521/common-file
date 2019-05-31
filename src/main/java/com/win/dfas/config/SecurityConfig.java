package com.win.dfas.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 包名称：com.win.dfas.config
 * 类名称：WebConfig
 * 类描述：${TODO}
 * 创建人：@author wanglei
 * 创建时间：2019/5/31/17:07
 */
@Configuration
@EnableWebMvc
public class SecurityConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("*") ; // 允许跨域请求
    }

}
