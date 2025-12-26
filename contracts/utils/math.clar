(define-constant ONE_8 u100000000)
(define-constant ONE_6 u1000000)

(define-read-only (mul-down (a uint) (b uint))
    (/ (* a b) ONE_8)
)

(define-read-only (div-down (a uint) (b uint))
    (if (is-eq b u0)
        u0
        (/ (* a ONE_8) b)
    )
)