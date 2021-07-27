---
title: User
parent: Api
---
	
## Table of contents
{: .no_toc .text-delta }
1. TOC
{:toc}
---

# Channel Emotes
GET `https://api-staging.betterbri.me/user/channel/xanax` 

### PARAMS
- nickname

Example Response

```json
{
	"emotes":"[{\"name\":\"WeirdChamp\",\"imgur_id\":\"AUccuYE\",\"created_at\":\"2021-06-21 23:34:28\",\"owner\":\"xanax\"}]",
	"role":128,
	"avatar":"https://cdn.betterbri.me/icons/512.png"
}
```
# User Information
GET `https://api-staging.betterbri.me/user/sub/:userID/:userSECRET` 

### PARAMS
- userID
- userSECRET

Example Response

```json
{
	"badges":"betterbrimeStaff",
	"color":"03dac6",
	"emotes":"[{\"name\":\"WeirdChamp\",\"imgur_id\":\"AUccuYE\",\"created_at\":\"2021-06-21 23:34:28\",\"owner\":\"xanax\"}]",
	"role":128
}
```