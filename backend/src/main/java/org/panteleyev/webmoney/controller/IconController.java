/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.controller;

import org.panteleyev.webmoney.model.Icon;
import org.panteleyev.webmoney.repository.IconRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.UUID;
import static org.panteleyev.webmoney.WebmoneyApplication.ICON_ROOT;

@Controller
@RequestMapping(ICON_ROOT)
@CrossOrigin
public class IconController {
    private final IconRepository iconRepository;

    public IconController(IconRepository iconRepository) {
        this.iconRepository = iconRepository;
    }

    @GetMapping
    ResponseEntity<List<Icon>> getIcons() {
        return ResponseEntity.ok(iconRepository.getIcons());
    }

    @GetMapping("/{uuid}")
    ResponseEntity<Icon> getIcon(@PathVariable UUID uuid) {
        return ResponseEntity.of(iconRepository.getIcon(uuid));
    }

    @GetMapping(value = "/{uuid}/bytes", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    ResponseEntity<byte[]> getIconBytes(@PathVariable UUID uuid) {
        return ResponseEntity.of(
            iconRepository.getIcon(uuid)
                .map(Icon::bytes)
        );
    }
}
