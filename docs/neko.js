/**
 * Neko.js - Bundled version
 * 
 * Based on Neko98 by David Harvey (1998)
 * Original Neko by Masayuki Koba
 * 
 * This JavaScript implementation created by AI (Claude) from original C++ source
 * Licensed under GPL v3 (see LICENSE.md)
 */

(function() {
    "use strict";

    // Embedded sprite data (base64-encoded)
    const NEKO_SPRITES = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABIklEQVR4nO1WSQ7EMAiDUf//ZeYwoguYLdVIPdSnqklsB0gI0QsMeQJntKAiQuPLG7ILRUQkIUTjqfinMMCI4KcBzUUcpYFsV0oQCTgEBi9TdFwNMB27bakYka455Vc9l4LISCYAB6xBK6zYAtI0b0akg5CvKkLMxpgv+p9hIx/COUsfTmv7s6CF01pKQZT7QU3siIoQ4pxjFWPmy/fUzCT87YvoZKbkn6SAu1XeFW9PMtjDcI6IMWd5BfwjorUidLdZMSZZb1g6BQTqYdghbxkISaMGldXEtAZaJwEczVu9oN2ikZEKlQERkfSBkTWmam1l4BJudNtlhsDa+6dg+CRrIe0FaDdTVBGLIiAqnIkreSZiOBxZtHKyZfh0L+a/eA6+YR662bT+YjsAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA40lEQVR4nO1XyxLDIAiUTv7/l+mhsfUBsogZM233ZkZ2F2SIUpoHN2uaIUGDWrHEXH8iEqlMfq9rboU7wpcRmPeBCpfiUrb527mHk1C1iIGu5Kv2wgauAnJW5rmr5EA/QAYERyNBl8b2CiA9QG1m1hoVhzacqEogVeTqQcSasEj6MRM2oCqCo9jUGUVVWRORqwLC1BS1hk04I57jmtGsYvskNA14s88oqxAyMDuE0NiRgW4AzcAaSPfvgZ83EOqDVfeBlDb+C0Qj74V+SYV5D6eBknjJw+T2Tfj9BqKAX0B/aHgCdIBeOO78F8UAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVR4nO1Wyw4DIQiEpv//y/TQuEVXmBG3ySbtnFQQRuWhSh02zLViBG0anXwE1otUU1Oh8JE5907a2MxOzsf1yb7wIBmBzpiqduMRbc3MujECJDASuVqXJvAtQAL+6huiGBjnIDBFROQJNeT85tEVMw5LBNg3XUxNESGzYDSE5m2NIQ4L0YzAzPCMhNsb+qGfAJ3Iy9jT0wQ8iZnD5jSSXUIAGV5x6oGCUCup5TaLgDijK6GqUmnF6h36hM67nSWRD7Ji/wYiB60FRynIABGwanA5EqmB+3fDP4HbEph9WCtYKsUe7CcFYbcUqySF5tJSDAyXe8YygeRUJRJLBIgr3eqeGUxASd3U/2G8AFt7mTLOfRenAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABF0lEQVR4nO2W3Q6DMAiFYdn7vzK70E5KDpTS6s1GYqJt5XzlR8tUM1H3XPSx9LKIHAzMKRfuomUABKHn1DzUehUBoKCIkIh8gZhZwwl6970DAAExM4EoCR2RaBO8JQIRhH5utycEE21KQQQBrKuFbQCO2NBmAERd2fYb2sjLlTiwQ1tooZDTilEXyMh5NezavAgMxdMCV6qgFhrcLR6m+dY2zJgF2Lb7CsDj4hagZOaH040/AmD/gJbjdoBOrfB17ABWP6+VGrqlDTP9DwGqXbASuQbQKWuHXpXbta0QZ3avAciecpuzKCpaXA9nxRsAOmIzcAzFveesMQBonqC6dy4wPqcAtFj6gIJgZvM/vTiC2eTzbz9oHxxQekFCimcpAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABKUlEQVR4nOWX3Q7CMAiFD2bv/8p4sdGxFljpT7zwJMaoG+cDCpnAv4sWxOAZj1kABgBmBtEZivnJc33v+mQAmkxrs8q0XBNBpAAsQy9zB6jx+yQASGdWkYGIysu7H2cVH6RHAiCUVCAAEIiHMhW44sddi1qBuwKlElmAtBRwmRgNmQVgPXISsPNGs02ZM2BOgScPsp4Iq6HaRX5vzImoO3vPHHBaoMrFlrlcIwHr917z5sMd++5VNsvAPLUJl0BEG1BkHcL5lBFnreWeAb3j35bPqDnwrEBZFBbQDnN9YWrGV5kDiU2YbcNSgFXjOASw0xw4D6G5ZrMa6b8AvAXalz6qFoxmMXofMPBI5rRneEQKQE8WM5l6+uwK3KvjV8ai7Q+lq9T8oVilL9sKg2SESmbvAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHElEQVR4nO2WwRLDIAhE2U7//5fppVjUFVHTaQ/ZmVwSw74gEEVu/Vi4KI7uxjwFUBER1Y8/UEKmYu8CdMZd4CTIDoBGxgOQoc/jm+YZeQCVupguMX+/M3yxysBs8a6iuN0WuMVa3z7jGkF4AFjlquoIpJOr9ukaBhEWoYGoKjUCELYiA2wh0l1wuAXwIB6i6oLV/l6EAsuiARTzzJ6uqEk52npYHUSXQogkagBAudqg2WyRcVwgntK0BduKkwIM/gUwAGqQaS+fhV1II9uadC2EiWRx+jekLWJBRs/M3A+sVbWRWQT4+8yE1YufE9GZoO0CkKu8bF/MUj4DG2l16kwHlquJUl+R19GRjKR2+XR8dCglMcKvvXXrL/UCkH+5C6s6Dz0AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAklEQVR4nO2V2xKDMAhE2U7//5fpi1iCXBJL60zHfdKY5CwkINGti4VgnJNvHWJ5eMxM6oYzMzFzbmCb0G2CBSzKMtBtYoADICJCaqDRhAsn8jNwgCkTZ4yE8OHBm+zJbpCBtw3TtU8PDoAKI1GZ7ouqQDwDU2JmieQAnoVqlZcwMkHvaIe6Xlg3GBjOfiGS8s5UCo/AptmCPgWXBroAleQI4Fysn+jQB4aXL2VB94Mq7CVDE/1j3cBqFuQoJztqauB0c9GAbA8AYRW48Cq6qHSzknb7uQeQ8y2qZepS673Kv6GO2sDP1C3brMD7aMHqvaNZCMTdUIcPM3ZNp7p16+/1AoBksuBmmrTtAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGElEQVR4nO2W3Q6DMAiFwfj+r8xupBLKb+vijSfZkilwPmmlA/j0snAhhzbzlwEIAIDo9kcc6csglcTJeCqyAZIlUGTsgLQgjk5wpgu2TpwAtJ6+AUHyvgewZF7QVNcC2DY3ukBeXQ0wgsTOdlWIGcaq7kiUABNhZkBEZgwiAptm3WQAMgbM8nDpLOG0B7rmXheieFBvgV53vGOffRMYVEIc6ubfzD0dhvl1qdZW3nD6Gn8qAAj2mpchLCC5rKr1UrR8GMmiVheqsCkAm0hTQbdlDgB4dhP1vKh0yDMfX77X/eRWF4Li4yfYJ+MISjtgbcTIWAwmTgyXOeyAiqFo6nmHTab2n1Ijz5ukjwNICDSurdT79Ol9/QD98LQSLfZm6wAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBklEQVR4nO1V0Q6EMAiDi///y9yLLHUC66Ymd4lNTNQArQWcyIsfgMH1NM8JHxERMxMzS4OeIm8C2OBV8v3jUgGqqh55txMluQsQFOFCbhAxJEcBd4qwgvz0UqMgTAZRUWyZG2Gv12pFQ9hXRDeqdS2Zcc4wdhsJQCFQzB80i2HRO0ANTrAtVB4jYAozg4oCMY9uAVMYgRtVxV0WkIFtyaUWrAJXEX1aHiSS8PDKb6ZboKq0vcxPbJN9Gsk/2NKul3WlsD44G+YJBi4cBGSrwwrJXKpENAGYXAzN0AbPj4T2B1ET0CdHSglEdTI3QkvCA2YRp7YGR/zyl9IinK97fpr3xYs/wxfuy7Lj/kO2hgAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCklEQVR4nO2WSw7DMAhEcdX7X9ldJFQO5jfYirLISFmkJcOTwcZEr3D189miT4mg920gJQCGGEDuBxhBViAsgE7AEq+UpNmeh1drl5DGSfj/yfCIt3xxAMXcTF6B8IJUCC2ZAxtCbGlCUSZIywAMwUJhIIDI3CpHFaDJhNpyj+9ocqK4SVKNKEGS3ukg9UyQdVf6YBvABcI0KkIgLTsRJLo/9P8CANKsAjSpeg70lb0/ClkBNfn5QxkARU81I+KdKUFqzhuTMvw2KsF4BqhGzoiW38LbZFpuLVn2/LfOBWgXrDQbW5Aoi1uC7A2IY71blPThsphXMivxmAiZhNawcgGS+l9UgfhXz9EPsSqlDRy22m8AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCUlEQVR4nO2W0a7EIAhEnZv9/1/2vpRdtB0YXLtPnaRJExEPKGhrjx5p6se3XX8yQe+3gMgABrEbpARAQH4P4EHal9mA9xeNHYtxR4DNMUNw64+GDFhqp8ik6PyWVLbn5f4B4B1pFvEuLZ2BI923ACBzDqCSndTwKgMUorK4WqrLZQhA2ooMgnkYJsxRs0wYUDB2Wo8CVKvAoKoQdAssxeZQPfll8MgXc8ii9JBqBpSwTp6iKKNKKW2Bn+e+NMX+HChSAG57DSkAPWsoarTMLgIYStH+lVYdDVcAroiW7FgTam28jk+KmoqiKRtXTsAAaA+4WmAuvawfOLsu3QWJ/DOsqn0Pi0er+gdkMKQLf5051AAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA9klEQVR4nO2VzRLDIAiEs528/yvTS5NRyvKjTHsJx6jwueDmOJ54Yi2kK9FrpbiItEEwgDB5F4QFkL5hBwRtAUl+wbVBuDPwCyXCIRySf92+A+LMbPIK74alAAAsJVtRYcUH7lgFHSPVAla4ozVlAAC08AesJAvbPFUICt7rQUvMRaqAJ2/UAus7ALEg0gpo6dltE+DTQU8zYQnH4pVBrAJMINMH1XOtTGVIqw/ZtGOtCIOwADLP8MpEYXf8IHJCERHXYnfd0AOY5E6+dbrOTKr0L8hKXWmJOwO7nm+ooROBAVAPsAp4JhUYk6ScMAgU9+uzT/w33t2WoP+qWuSTAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA70lEQVR4nO1Wyw7DMAgr0/7/l73LmAglBJNKU6X6VDUBm0dCjuPBDYHN9QEvlhxARrJa3xagLBGJklNgBJQJmCy0MhCQtKJnBGQE4UI1C++igJi5GbVFqwQiQv2/XMCVuKeAWe07PUE1oa2xkonI8M2KYbqGOutfMUv/TAmk2uVV8vImh18abEacuLLfzkWkzqN60AF1j+GpH9gxvCNg2owdEd0HSbaBElERAMYha7sSAABpVMnRXNquBAzpjm67TFBgG4qgeoB8kpWQ3gNRNCxcxrwjmQlAhVid24F0chQMLWOPWUGZkIXc720f/BcfQ6ib3RoDepoAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBElEQVR4nO2W0Q7DIAhFYdmH98/ZEwkiIhebLE16X5bVyj0iRYlePVByOD7og5qLSGayGz8GUJfIRM0hIQBlAyQLrQwEJq3VIwCZQThQzcK3CEBERMw8GHgoP14RBGCDMjOJyPSLCq4BXaWaejj7rKJyBqyx/r/MmD73YLcBIOlFstH+DO8SsmEyFaEJsvgitvGxigkg6MC8A0BkmksEg8aF+oALHlUlvKBuEU6tGT2GTwCW50IHonshyV6AICoAggRE5+4AxJx6YaCk223n7gCGdFfba9QbMgioBsArWUlpH1h1OkQuYz4QrwCkYqzBs8uI3bqgZctqQ5ElM/i+n/vqv/oBKoa/WI/BrT0AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1ElEQVR4nO1USQ7EIAxzRvP/L6eXgUlTstDCpYqlqmyJTTAAhUKhUCjsB3uTn93kzOyKWCHASt7IXTwVYO0wRQ4A3wXkvR+tB0B6cLYC3D5J3tr6fwo0vJAV0Emt0jIziC4bPM2NRIwjLvH/GJFoGkJgb+y+hiEiAWk3T6In9QQsJW/l1zmnj0CajYhM40lizzdP3oGeVIqYMCwDcOW7R2Alj8blHwDdvgXWvddVkUcwWh+9A6ERIw9oQaofRP9yeIkjQZJw4JmUgLQoqSOx7i73y3AA4giQ7eL+8PYAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA10lEQVR4nO2UUQ7EIAhEYbP3vzL7wxo6IqKpadIwSWNKlXmClahUKpVKpbMSfYb6nDQXCb1vARg5zJ1vABAYrx919zoOgb6bpi05M4cGsJYxmK2AkPYUdnYZMYawHmhH5JljQmbuTLQSrrldo/Oa7wwgZZ7VH9L6nvwNU3oKoJUwAkhdJBmZ0nftW66AOUjEzO2JzKONrN4DHYw18mKBuRARb50BWwUbw7gHg1Dbh9CDsKbYptH85XugSxD03wOC98lqzRElngFZQ4TJAqShLEdi3q73y/QDzYaO9US4bAEAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABH0lEQVR4nOVX0RLCIAwrnv//y/EFbgVaGjp2emdedFLSUCCrIhzgfI7j7fs47uLFBpIAAAEwinLxjgiTYzQKGTclq6u8iIpLtcxBCwAgpZQp8USoYqqoZQ76DBjE03hVuqpGSgAaMYsdEadvwTYYmdhZfUdOnIFIgJnZE5S5CZSAJysQnYHSiPTqxpVaz0xyKkCUB6gfZqJh/KgAL+mS+BJ0xgm7B/4QHqlAzZmqQMhPOWHmFrCv5EhA2oRYEV+34p8UsNXTbcDkHQXoPYfI0t9DqLlur2j2hPrgNVvNGlHYQdn5n9gB2xu8+l77MFSjC3JatMWcfauUfs90POA3n96cCdH/Ao8g2ib65GZ8AEaJ01fllhHdTX4HT5nVH+IDSk+VHrQ/yTUAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHUlEQVR4nOVWWw7DMAiDqfe/MvvoQ4xAMHlok2ZpmloS7AIhEGGQ66efrd37T/FCyEWERKTkGMUxsTcTc9t5iQDmx88ZChFrt+HvEj/7gDVykzFzQ9wRCglAaqAhVyQNcbVeIAHIl48CjsAulGqg7PxMS5cjE+AyR4K82sh4UgEzuV8RASIVheg4es+of7gGdHi9qFg78vWwgIi06xiMAtStyBRjoQiXRODiHIpA6h++jqtA23EmYOoYIiK+3op/UoCd/1bB9WsF6JwLUbe/p9BTVDQnuCOZbasj84AeULrrfP49w4fXG6L4NheQckDWFr13bPVWSZ850+vFCGBgT4PxCjOpQluvxUwfYOeKLhfPbCPimWO6Erua1x/gDfHvngq4OJEYAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/ElEQVR4nO2WUQ/DIAiEj2X//y+zF2ksgmCL3UsvWbJM4nfisRbYL24fU5/dcGaXvd1ACAeA7x/hDABUDW70YYHoQBG6TFQaSLW8MwKgLgMpeCvcYiCUPvnjBrSkE48b0J3YNYYuXGfgioEhbcxsbi5QqTFNrYKzaY8kxrIG0mOWBTc2ZwxM4VGLDbDAz1+uwDXAvWcHDszHcKntEsSJSMMjA8tKmBjkjWFJ6FTg0gZuk2d3HhkoG7cILOozcBueabln4AQnojBMuuYKXIoHuLdmmUjsnypg4zfoNe9hYx2gG8mpCbkCgvNH0a9ZJ76dm8X6VVr1W/erV/X6AU6CeC0t3vKrAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCElEQVR4nO2WzRKDMAiE2Y7v/8r0kqSISVzS0F5kxoPK8G34U5F803J17ZUNVx2y0wXcwjMFUHARkWM3uNBpf+yEz8BAQ1nmNgF0youQytXsKfDgWp6m9mcCRvYXATYLqQIA+NRffRbiXiKpqgAYQ5wI04ihKYjO+NCsAHYR0WPWAdkgfgypElAL5k7g6iIKLRjG12cF8mkqLyacdlaE9T8KSQBoR0TIRtPgT21ftT3gVuRS012imz1gOTY2PIxtqhnUP3L3p5K3r9KOEzsBVDlrCTCpUxq853hKQ2T+V+CMM/uXsxqf24RGTVeEb2Kzcm8ZzOcY9eqd+NvmjXZelLbzp/exx3LsDfOJkxZk2B+5AAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA+UlEQVR4nO2VSw6AIAxEKfH+V64bwfIpTPm5cRKNgdB50FKd08XPs1W+NcnMAeQbgBMQXYDdEB4NLCCWgtATkKSXMKwvIgprlwNwy3gHhKyBaP4EPyKoCE8AwEe/CyCRTMXudMgiLGpAOxUicsyswZmIqwAzElAQSPUa5jsbAUOv6VAjEgbTDSsAvO7AbkMNIOpBmHNvMe9AsBysRsyNRswVgFhrXoxUDVf0gex3npz49XpRGC2OamEzKtJtiQzdDlQhLZafEYmFS8zjy6jkJAz9IBkqPhBTdXKiGSEASXuWZtq1zHbc9LhakwCZZg6ndkkKJuL++vW9bhYolBau0DkQAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABA0lEQVR4nO2WSw7DIAxEPVHuf2V30TgyCP8SoJuOVKkthHkG24HIFl+fpTq8QWYWkN8A7IA4KLHVKyHQLXz/vkzbyYCetwRgaGyATIFociBjruZNOZJhEqqtXq6DKB/5MgDRzshFp3yRXdgNga+3XXLWGDNbsKUI3Lp/omqvEIBVICFEP+F2j0C8I6pAjAZDCMmBjCKIUSOC90DFnCjumuHr+I15Rh4AAEzpC94unKM/NQQR8cTmJBXXGFQefn0EfVKWcsDpfqU1SB1HBQCjFpzJk36OhsiGk7kzmuZkdFoAKQDWUfcLBHdHMW/W02NRFURklrkX2KMqqKb+/pvNX3891QdsP4ApjDDinQAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABHElEQVR4nO2WwRLDIAhEof//z9tLSJUAATTTQ7uHzKSi+6JIIfrry+JCLDat4060DGQcgO3PPHmXQUKDY/Ezhj7BU4y8q/gSQGig40bDFfNoAgyICc4wfw6gCNI+gluA1IJFiFfLJdABLvSg+PruB5hZXO8T7DEAZT7tyDjmAbAqMGmNSalAAECDhTtQgmDmi7kBcdHdEaQgxDh7c8abkskBlq9bkQeXTUKmhbyIVL0FJkS3aHUATMkRabi7dyJCB+CyC5KAACq5AiLi5R2wYLJTz0dTZl+Qci5ew2AdFhIzBwzTa14sAIjc5kXgjLF+B5OBsEAERvcLu/4NvSLFYiaAql94tB+YQLz82AnQKtX7i/vcgun14fz+w3oDTA6XRee9YIQAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVR4nO2WSxLDIAxDUaf3v7K7aEKJI/8I7abRMjHWsw0Mrf27kIiRYvwSgG4q8vEHDuFLYFgSGU3pIlDvKaCwA6cfBtwGVYaIFtBRmMkmILxgyRpfgXBHUDVXEMxD9LeHleSqOVlPN7cJ4CWPlDUvA4iICwGgZF4G8CCYuYiEoywDMBmVp2QBIDvvq1rSASZdgDodvV1fA8jqWV2g571X5px/SzIFcMpiGLIToYTWfjgCa1N7AKeTYLU/o9mbMH0coxtS7ZUenHoT6qr321BXFcCivTfeISizCQEgfKYNtCzBCHHQ1Cmwqnc6Yramct/2Loxmuu3qe5i/BLAbkFm7r55VAGPymbW3blG9AHEphjo0CJF9AAAAAElFTkSuQmCC"
    ];


    // Animation states (matching original Neko.h enum)
    const NekoState = {
        STOP: 0,
        WASH: 1,
        SCRATCH: 2,
        YAWN: 3,
        SLEEP: 4,
        AWAKE: 5,
        U_MOVE: 6,      // Up
        D_MOVE: 7,      // Down
        L_MOVE: 8,      // Left
        R_MOVE: 9,      // Right
        UL_MOVE: 10,    // Up-Left
        UR_MOVE: 11,    // Up-Right
        DL_MOVE: 12,    // Down-Left
        DR_MOVE: 13,    // Down-Right
        U_CLAW: 14,     // Clawing upward (at top boundary)
        D_CLAW: 15,     // Clawing downward (at bottom boundary)
        L_CLAW: 16,     // Clawing left (at left boundary)
        R_CLAW: 17      // Clawing right (at right boundary)
    };

    // Behavior modes (matching original Action enum)
    const BehaviorMode = {
        CHASE_MOUSE: 0,
        RUN_AWAY_FROM_MOUSE: 1,
        RUN_AROUND_RANDOMLY: 2,
        PACE_AROUND_SCREEN: 3,
        RUN_AROUND: 4
    };

    // Animation timing constants (in frames)
    const STOP_TIME = 4;
    const WASH_TIME = 10;
    const SCRATCH_TIME = 4;
    const YAWN_TIME = 3;
    const AWAKE_TIME = 3;
    const CLAW_TIME = 10;

    // Sprite size
    const SPRITE_SIZE = 32;

    class Neko {
        constructor(options = {}) {
            // Configuration
            this.speed = options.speed || 10;
            this.behaviorMode = options.behaviorMode || BehaviorMode.CHASE_MOUSE;
            this.idleThreshold = options.idleThreshold || 8;

            // State
            this.state = NekoState.STOP;
            this.frameCount = 0;
            this.animationFrame = 0;
            this.tickCount = 0;

            // Position
            this.x = options.startX || 0;
            this.y = options.startY || 0;
            this.targetX = this.x;
            this.targetY = this.y;

            // Bounds
            this.boundsWidth = window.innerWidth - SPRITE_SIZE;
            this.boundsHeight = window.innerHeight - SPRITE_SIZE;

            // Mouse tracking
            this.mouseX = 0;
            this.mouseY = 0;

            // DOM element
            this.element = null;
            this.spriteImages = [];

            // Animation lookup table (maps state to sprite indices)
            // Format: [frame1_index, frame2_index]
            this.animationTable = [
                [14, 14],  // STOP - uses sleep frame
                [9, 9],    // WASH
                [10, 11],  // SCRATCH
                [12, 13],  // YAWN
                [14, 15],  // SLEEP
                [0, 0],    // AWAKE
                [1, 2],    // U_MOVE
                [3, 4],    // D_MOVE (using down sprites)
                [5, 6],    // L_MOVE
                [7, 8],    // R_MOVE
                [1, 2],    // UL_MOVE (reuse up frames)
                [1, 2],    // UR_MOVE (reuse up frames)
                [3, 4],    // DL_MOVE (reuse down frames)
                [3, 4],    // DR_MOVE (reuse down frames)
                [16, 17],  // U_CLAW
                [22, 23],  // D_CLAW
                [20, 21],  // L_CLAW
                [18, 19]   // R_CLAW
            ];

            // Additional state for behaviors
            this.idleFrameCount = 0;
            this.cornerIndex = 0;
            this.ballX = 0;
            this.ballY = 0;
            this.ballVX = 0;
            this.ballVY = 0;

            this.init();
        }

        init() {
            // Create the neko element
            this.element = document.createElement('div');
            this.element.className = 'neko';
            this.element.style.position = 'fixed';
            this.element.style.width = SPRITE_SIZE + 'px';
            this.element.style.height = SPRITE_SIZE + 'px';
            this.element.style.imageRendering = 'pixelated';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '999999';
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';

            // Create image element
            const img = document.createElement('img');
            img.style.width = '100%';
            img.style.height = '100%';
            this.element.appendChild(img);

            document.body.appendChild(this.element);

            // Track mouse position
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            // Update bounds on resize
            window.addEventListener('resize', () => {
                this.boundsWidth = window.innerWidth - SPRITE_SIZE;
                this.boundsHeight = window.innerHeight - SPRITE_SIZE;
            });

            // Random starting position
            this.x = Math.random() * this.boundsWidth;
            this.y = Math.random() * this.boundsHeight;
            this.updatePosition();

            // Animation loop
            this.running = false;
            this.intervalId = null;
        }

        start() {
            if (this.running) return;
            this.running = true;

            // Update at ~20fps (matching original 200ms timer)
            this.intervalId = setInterval(() => {
                this.update();
            }, 100);
        }

        stop() {
            this.running = false;
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }

        setSprites(sprites) {
            this.spriteImages = sprites;
            this.updateSprite();
        }

        updateSprite() {
            if (this.spriteImages.length === 0) return;

            // Get the current animation frame index
            let frameIndex;
            if (this.state === NekoState.SLEEP) {
                // Slower animation for sleep
                frameIndex = this.animationTable[this.state][(this.tickCount >> 2) & 0x1];
            } else {
                // Normal animation speed
                frameIndex = this.animationTable[this.state][this.tickCount & 0x1];
            }

            // Update the image
            const img = this.element.querySelector('img');
            if (img && this.spriteImages[frameIndex]) {
                img.src = this.spriteImages[frameIndex];
            }
        }

        updatePosition() {
            this.element.style.left = Math.round(this.x) + 'px';
            this.element.style.top = Math.round(this.y) + 'px';
        }

        update() {
            this.tickCount++;

            // Update behavior based on mode
            switch (this.behaviorMode) {
                case BehaviorMode.CHASE_MOUSE:
                    this.chaseMouse();
                    break;
                case BehaviorMode.RUN_AWAY_FROM_MOUSE:
                    this.runAwayFromMouse();
                    break;
                case BehaviorMode.RUN_AROUND_RANDOMLY:
                    this.runRandomly();
                    break;
                case BehaviorMode.PACE_AROUND_SCREEN:
                    this.paceAroundScreen();
                    break;
                case BehaviorMode.RUN_AROUND:
                    this.runAround();
                    break;
            }

            // Update animation frame
            this.updateSprite();
            this.updatePosition();
        }

        chaseMouse() {
            this.runTowards(this.mouseX, this.mouseY);
        }

        runAwayFromMouse() {
            const dx = this.x - this.mouseX;
            const dy = this.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Run away!
                const awayX = this.x + dx * 2;
                const awayY = this.y + dy * 2;
                this.runTowards(awayX, awayY);
            } else {
                this.idle();
            }
        }

        runRandomly() {
            if (this.isIdle()) {
                if (Math.random() < 0.02) {
                    // Pick a random target
                    this.targetX = Math.random() * this.boundsWidth;
                    this.targetY = Math.random() * this.boundsHeight;
                }
            }
            this.runTowards(this.targetX, this.targetY);
        }

        paceAroundScreen() {
            const corners = [
                [0, 0],
                [this.boundsWidth, 0],
                [this.boundsWidth, this.boundsHeight],
                [0, this.boundsHeight]
            ];

            const target = corners[this.cornerIndex % 4];
            const dx = this.x - target[0];
            const dy = this.y - target[1];
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.idleThreshold) {
                this.cornerIndex++;
            }

            this.runTowards(target[0], target[1]);
        }

        runAround() {
            // Simulate bouncing ball
            if (this.ballVX === 0 && this.ballVY === 0) {
                this.ballX = Math.random() * this.boundsWidth;
                this.ballY = Math.random() * this.boundsHeight;
                this.ballVX = (Math.random() - 0.5) * 20;
                this.ballVY = (Math.random() - 0.5) * 20;
            }

            this.ballX += this.ballVX;
            this.ballY += this.ballVY;

            // Bounce off walls
            if (this.ballX < 0 || this.ballX > this.boundsWidth) {
                this.ballVX = -this.ballVX;
                this.ballX = Math.max(0, Math.min(this.boundsWidth, this.ballX));
            }
            if (this.ballY < 0 || this.ballY > this.boundsHeight) {
                this.ballVY = -this.ballVY;
                this.ballY = Math.max(0, Math.min(this.boundsHeight, this.ballY));
            }

            this.runTowards(this.ballX, this.ballY);
        }

        runTowards(targetX, targetY) {
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.idleThreshold) {
                this.idle();
                return;
            }

            // Wake up if sleeping/idle
            if (this.isIdle()) {
                this.state = NekoState.AWAKE;
                this.frameCount = 0;
            }

            // Calculate direction
            const direction = this.calculateDirection(dx, dy);

            // Move towards target
            const moveSpeed = Math.min(this.speed, distance);
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * moveSpeed;
            this.y += Math.sin(angle) * moveSpeed;

            // Clamp to bounds and check for boundary collisions
            const atBoundary = this.clampToBounds();

            if (atBoundary) {
                // Scratching at boundary
                if (this.x <= 0) {
                    this.state = NekoState.L_CLAW;
                } else if (this.x >= this.boundsWidth) {
                    this.state = NekoState.R_CLAW;
                } else if (this.y <= 0) {
                    this.state = NekoState.U_CLAW;
                } else if (this.y >= this.boundsHeight) {
                    this.state = NekoState.D_CLAW;
                }
                this.frameCount = 0;
            } else {
                this.state = direction;
                this.frameCount = 0;
            }
        }

        calculateDirection(dx, dy) {
            // Calculate angle and map to 8 directions
            const angle = Math.atan2(dy, dx);
            const deg = angle * 180 / Math.PI;

            // Normalize to 0-360
            const normalized = (deg + 360) % 360;

            // Map to 8 directions (45-degree increments)
            if (normalized >= 337.5 || normalized < 22.5) {
                return NekoState.R_MOVE;
            } else if (normalized >= 22.5 && normalized < 67.5) {
                return NekoState.DR_MOVE;
            } else if (normalized >= 67.5 && normalized < 112.5) {
                return NekoState.D_MOVE;
            } else if (normalized >= 112.5 && normalized < 157.5) {
                return NekoState.DL_MOVE;
            } else if (normalized >= 157.5 && normalized < 202.5) {
                return NekoState.L_MOVE;
            } else if (normalized >= 202.5 && normalized < 247.5) {
                return NekoState.UL_MOVE;
            } else if (normalized >= 247.5 && normalized < 292.5) {
                return NekoState.U_MOVE;
            } else {
                return NekoState.UR_MOVE;
            }
        }

        clampToBounds() {
            let atBoundary = false;

            if (this.x < 0) {
                this.x = 0;
                atBoundary = true;
            } else if (this.x > this.boundsWidth) {
                this.x = this.boundsWidth;
                atBoundary = true;
            }

            if (this.y < 0) {
                this.y = 0;
                atBoundary = true;
            } else if (this.y > this.boundsHeight) {
                this.y = this.boundsHeight;
                atBoundary = true;
            }

            return atBoundary;
        }

        idle() {
            this.idleFrameCount++;
            this.frameCount++;

            // State machine for idle animations
            switch (this.state) {
                case NekoState.AWAKE:
                    if (this.frameCount >= AWAKE_TIME) {
                        this.state = NekoState.STOP;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.STOP:
                    if (this.frameCount >= STOP_TIME) {
                        this.state = NekoState.WASH;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.WASH:
                    if (this.frameCount >= WASH_TIME) {
                        this.state = NekoState.SCRATCH;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.SCRATCH:
                    if (this.frameCount >= SCRATCH_TIME) {
                        this.state = NekoState.YAWN;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.YAWN:
                    if (this.frameCount >= YAWN_TIME) {
                        this.state = NekoState.SLEEP;
                        this.frameCount = 0;
                    }
                    break;

                case NekoState.SLEEP:
                    // Stay asleep
                    break;

                case NekoState.U_CLAW:
                case NekoState.D_CLAW:
                case NekoState.L_CLAW:
                case NekoState.R_CLAW:
                    if (this.frameCount >= CLAW_TIME) {
                        this.state = NekoState.STOP;
                        this.frameCount = 0;
                    }
                    break;

                default:
                    // Any movement state should go to AWAKE
                    this.state = NekoState.AWAKE;
                    this.frameCount = 0;
                    break;
            }
        }

        isIdle() {
            return this.state === NekoState.STOP ||
                   this.state === NekoState.WASH ||
                   this.state === NekoState.SCRATCH ||
                   this.state === NekoState.YAWN ||
                   this.state === NekoState.SLEEP ||
                   this.state === NekoState.AWAKE;
        }

        destroy() {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    // Export to global scope
    window.Neko = Neko;
    window.NekoState = NekoState;
    window.BehaviorMode = BehaviorMode;

    // Auto-start if data-autostart is present
    if (document.currentScript && document.currentScript.hasAttribute('data-autostart')) {
        window.addEventListener('DOMContentLoaded', () => {
            window.neko = new Neko();
            window.neko.start();
        });
    }

    // Auto-initialize function
    window.createNeko = function(options) {
        const neko = new Neko(options);
        neko.setSprites(NEKO_SPRITES);
        neko.start();
        return neko;
    };

    // Auto-start if script has data-autostart attribute
    if (document.currentScript && document.currentScript.hasAttribute("data-autostart")) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                window.neko = createNeko();
            });
        } else {
            window.neko = createNeko();
        }
    }
})();