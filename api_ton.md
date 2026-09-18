url: https://apiton.tap.fairyland.world
url: https://apiton.mmbump.pro

# /buy

Авторизация: требует авторизации, передачей заголовка `Authorization`

Что делает?
Блокирует POINTS в кошельке и запускает выпуск NFT на адрес `address` из коллекции `nft_id`

method GET

входящие параметры
- address - string|required - адрес пользователя, куда передать NFT
- nft_id - integer|required - идентификатор NFT какой пользователь покупает

Результат 200:
```json
{
  "balance": "1000000"
}
```
`balance` - баланс после блока


Результат 400
```json
{
  "code": 400,
  "message": "Недостаточно денег"
}
```
```json
{
  "code": 401,
  "message": "У вас уже висит заблоченная сумма в транзакции"
}
```
```json
{
  "code": 404,
  "message": "Не найден такой NFT"
}
```
```json
{
  "code": 426,
  "message": "Ошибка обращения к API блокировки POINTS"
}
```
```json
{
  "code": 427,
  "message": "Ошибка обращения к API блокировки POINTS"
}
```
```json
{
  "code": 430,
  "message": "Insufficient balance of deployer's wallet"
}
```
```json
{
  "code": 431,
  "message": "Maximum amount of NFT minted"
}
```
```json
{
  "code": 432,
  "message": "Ошибка обращения к TON"
}
```
```json
{
  "code": 433,
  "message": "Ошибка обращения к TON"
}
```
