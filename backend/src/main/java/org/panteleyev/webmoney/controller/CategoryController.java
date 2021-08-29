/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.controller;

import org.panteleyev.webmoney.model.Category;
import org.panteleyev.webmoney.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.UUID;
import static org.panteleyev.webmoney.WebmoneyApplication.CATEGORY_ROOT;

@Controller
@RequestMapping(CATEGORY_ROOT)
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryRepository.getCategories());
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<Category> getCategory(@PathVariable UUID uuid) {
        return categoryRepository.getCategory(uuid)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
