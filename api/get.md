---
title: API GET
parent: Api
---
	
## Table of contents
{: .no_toc .text-delta }
1. TOC
{:toc}
---

# Global Emotes 
`https://api.betterbri.me/v2/brime/global/emotes`

Example Response

```json
[
  {
    "code": "EZ",
    "id": "8aHoefl",
    "date": "2021-06-01 20:56:58"
  },
  {
    "code": "FeelsOkayMan",
    "id": "kq2KcA6",
    "date": "2021-06-01 20:56:58"
  },
  {
    "code": "PeepoGlad",
    "id": "XSkgm4X",
    "date": "2021-06-01 20:57:14"
  },
  {
    "code": "pepeJAM",
    "id": "nMdi2MZ",
    "date": "2021-06-01 20:57:40"
  },
  {
    "code": "peepoHey",
    "id": "IjL5B3M",
    "date": "2021-06-01 20:57:40"
  }
]
```
# Badges
`https://api.betterbri.me/v2/brime/badges`  

Example Response

```json
[
  {
    "nickname": "BrimeBot™",
    "badge": "bot1",
    "color": "ff0000"
  },
  {
    "nickname": "Brin",
    "badge": "bot1",
    "color": "ff0000"
  },
  {
    "nickname": "Risk",
    "badge": "risk",
    "color": "00cdf9"
  },
  {
    "nickname": "WRLD",
    "badge": "",
    "color": "87ceeb"
  },
  {
    "nickname": "xanax",
    "badge": "16-dark",
    "color": "33925d;background: -webkit-linear-gradient(217deg, #03dac6, #00ff78);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"
  }
]
```
# Channel Emotes
`https://api.betterbri.me/v2/user/channel?nickname=xanax` 

### PARAMS
- nickname

Example Response

```json
{
  "emotes": "[{\"name\":\"NiceHost\",\"imgur_id\":\"amnJeue\",\"created_at\":\"2021-07-04 20:49:03\",\"owner\":\"betterbrime\"},{\"name\":\"RainbowPls\",\"imgur_id\":\"R7kTe02\",\"created_at\":\"2021-06-21 23:55:45\",\"owner\":\"xanax\"},{\"name\":\"WICKED\",\"imgur_id\":\"Jkewz2Y\",\"created_at\":\"2021-07-14 21:18:01\",\"owner\":\"betterbrime\"},{\"name\":\"Clap\",\"imgur_id\":\"10UGtbx\",\"created_at\":\"2021-06-28 17:44:51\",\"owner\":\"betterbrime\"}]"
}
```
