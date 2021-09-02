/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
package org.panteleyev.webmoney.controller;

import org.panteleyev.webmoney.model.Account;
import org.panteleyev.webmoney.repository.AccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static org.panteleyev.webmoney.WebmoneyApplication.ACCOUNT_ROOT;

@Controller
@CrossOrigin
@RequestMapping(ACCOUNT_ROOT)
public class AccountController {
    private final AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAccounts() {
        return ResponseEntity.ok(accountRepository.getAccounts());
    }
}
