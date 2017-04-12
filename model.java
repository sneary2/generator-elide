/*
 * Copyright 2016, Yahoo Inc.
 * Licensed under the Apache License, Version 2.0
 * See LICENSE file in project root for terms.
 */
package com.yahoo.elide.example.models;

import com.yahoo.elide.annotation.Include;
import com.yahoo.elide.annotation.SharePermission;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Model for Users (author of posts and author of comments).
 */
@Entity
@Table(name = "user")
@Include(rootLevel = true)
@SharePermission(expression = "Prefab.Role.All")
//@CreatePermission(expression = "Prefab.Role.All")
public class Book {
	
	private int pages;
	private String author;
	private boolean hardcover;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	
	public int getpages() {
		return pages;
	}
	public void setpages(int pages) {
		this.pages = pages;
	}
	
	public String getauthor() {
		return author;
	}
	public void setauthor(String author) {
		this.author = author;
	}
	
	public boolean gethardcover() {
		return hardcover;
	}
	public void sethardcover(boolean hardcover) {
		this.hardcover = hardcover;
	}
	

}