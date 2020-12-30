-- address/billing information
-- product information 
    -- sku
    -- size
    -- quantity
-- Page information
-- actions on Page
    -- refresh for product
        -- human activity(like delay)
    -- select product information
    -- checkout
    !-- timeout handling
    !-- captcha handline
-- repeat or report success.


-- pathing
    SubTasks go in order A -> B -> C -> D
        - If C is interrupted (through waitForXPath detects something) it may
            reroute to A
        -  If B does have a certain cookie it may be able to skip step C
        - Supporting 
            A -> B -> C1 -> D1
                  `-> C2 / 


-- macro task cycle
-- walmart specific bot


-- bypass bot checks
    -- hook up our puppeteer instance against numerous public checks
    -- find weak points
    -- find working solutions or code own


-- spinning up multiple tasks
-- captchas
-- proxies
