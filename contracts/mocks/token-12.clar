;; Mock Token 12
;; (impl-trait .sip-010-trait-ft-standard)

(define-fungible-token token-12)

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (print "Transfer 12")
        (ok true)
    )
)

(define-read-only (get-name)
    (ok "Token 12")
)

(define-read-only (get-symbol)
    (ok "TK12")
)

(define-read-only (get-decimals)
    (ok u6)
)

(define-read-only (get-balance (who principal))
    (ok u0)
)

(define-read-only (get-total-supply)
    (ok u0)
)

(define-read-only (get-token-uri)
    (ok none)
)
