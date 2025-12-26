;; Mock Token 185
;; (impl-trait .sip-010-trait-ft-standard)

(define-fungible-token token-185)

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (print "Transfer from Token 185 contract")
        (ok true)
    )
)

(define-read-only (get-name)
    (ok "Token 185 Yield Bearing")
)

(define-read-only (get-symbol)
    (ok "TK185")
)

(define-read-only (get-decimals)
    (ok u6)
)

(define-read-only (get-balance (who principal))
    (ok u0)
)

(define-read-only (get-total-supply)
    (ok u1000000000)
)

(define-read-only (get-token-uri)
    (ok (some "https://stacks.co/token-metadata.json"))
)
