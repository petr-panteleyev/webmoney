/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.controller;

import org.panteleyev.webmoney.model.Version;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import static org.panteleyev.webmoney.WebmoneyApplication.VERSION_ROOT;

@Controller
public class CommonController {
    @Value("${spring.application.version}")
    private String appVersion;
    @Value("${spring.application.name}")
    private String appName;

    @GetMapping(VERSION_ROOT)
    public ResponseEntity<Version> getVersion() {
        return ResponseEntity.ok(new Version(appName, appVersion));
    }
}
