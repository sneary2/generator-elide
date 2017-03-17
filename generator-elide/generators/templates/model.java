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
public class <%= name %{
	private <%= id_type %> id;
	
	<% elements.forEach(function(element){ %>
		private <%= element.type %> <%= element.name %>;
	<% }); %>

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public <%= id_type %> getId() {
		return id;
	}

	public void setId(<%= id_type %> id) {
		this.id = id;
	}
}