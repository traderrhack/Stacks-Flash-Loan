;; Staking Contract
(define-map stakes principal uint)

(define-public (stake (amount uint))
    (let ((current-stake (default-to u0 (map-get? stakes tx-sender))))
        (map-set stakes tx-sender (+ current-stake amount))
        (ok true)
    )
)