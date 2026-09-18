# Staking System Documentation

## Общее описание
Система стейкинга позволяет пользователям стейкать токены и получать награды в виде токенов и NFT. Система состоит из нескольких компонентов:
- Frontend (React)
- Backend (Laravel)
- TON Backend (Express)
- Smart Contracts (StakeMaster и Stake)

## Основные процессы

### 1. Стейкинг токенов
Процесс создания нового стейка:

1. **Инициация стейка**
   - Пользователь указывает:
     - Количество токенов для стейка (`amount`)
     - Длительность стейка (`duration`)
     - Количество NFT для минта (`mint_count`)
     - Максимальное количество клеймов (`max_claims`)

2. **Создание стейк контракта**
   - Backend формирует параметры стейка
   - TON Backend создает сообщение для смарт-контракта
   - StakeMaster деплоит новый Stake контракт с параметрами:
     - `amount`: сумма стейка
     - `out_amount`: сумма награды
     - `stake_time`: длительность периода
     - `mint_count`: количество NFT
     - `max_claims`: максимум клеймов

### 2. Клейм наград
Процесс получения наград:

1. **Запрос на клейм**
   - Пользователь нажимает "Claim Reward"
   - Backend проверяет возможность клейма
   - TON Backend формирует Claim сообщение

2. **Обработка клейма**
   - Stake контракт проверяет:
     - Активность стейка (`is_active`)
     - Время следующего клейма (`next_claim`)
     - Количество оставшихся клеймов
   - При успехе:
     - Отправляет DoMint в StakeMaster с `out_amount`
     - Обновляет `claims_count` и `next_claim`

### 3. Рестейк
Процесс продления стейка:

1. **Условия рестейка**
   - Доступен только после выполнения всех клеймов
   - Требует активный стейк

2. **Обработка рестейка**
   - Сбрасывает `claims_count` в 0
   - Устанавливает новое время `next_claim`
   - Сохраняет все остальные параметры

### 4. Вывод стейка
Процесс вывода средств:

1. **Условия вывода**
   - Доступен только после выполнения всех клеймов
   - Требует активный стейк

2. **Обработка вывода**
   - Stake отправляет DoMint с полной суммой стейка
   - StakeMaster переводит токены пользователю
   - Stake помечается как неактивный

## Смарт-контракты

### StakeMaster Contract
Основной контракт, который:
- Управляет созданием Stake контрактов
- Обрабатывает минт NFT
- Управляет переводами токенов

### Stake Contract
Индивидуальный контракт для каждого стейка, который:
- Хранит параметры стейка
- Управляет клеймами
- Контролирует временные ограничения
- Обрабатывает рестейк и вывод

## Безопасность
- Все операции требуют подпись владельца
- Временные ограничения на клеймы
- Проверки баланса и лимитов
- Валидация всех входящих параметров

## API Endpoints

### Backend (Laravel)
- `POST /lootboxes/stake` - создание стейка
- `POST /lootboxes/claim` - клейм наград
- `POST /lootboxes/restake` - рестейк
- `POST /lootboxes/withdraw` - вывод стейка

### TON Backend (Express)
- `POST /stake` - создание стейк контракта
- `POST /claim` - запрос на клейм
- `POST /restake` - запрос на рестейк
- `POST /stake/withdraw` - запрос на вывод

## Диаграммы
Детальные диаграммы процессов:

![Staking Flow Diagram](./staking-flow.png)

Исходный код диаграммы находится в файле [staking-flow.puml](./staking-flow.puml)

## Обновление контракта (03.02.2025)

### Исправления
- Решена проблема с клеймом реварда
- Добавлено поле `out_amount` в контракт Stake для хранения суммы награды:
  ```tact
  // sources/staking/contracts/stake_master.tact
  contract Stake {
      out_amount: Int;  // Сумма награды, хранится отдельно от суммы стейка
      ...
  }
  ```
- При клейме теперь отправляется корректная сумма награды:
  ```tact
  // sources/staking/contracts/stake_master.tact
  receive(msg: Claim) {
      ...
      send(SendParameters{
          to: self.master_address,
          value: 0,
          mode: SendRemainingValue,
          body: DoMint{
              query_id: msg.query_id,
              amount: self.out_amount,  // Используется out_amount вместо amount
              ...
          }.toCell()
      });
      ...
  }
  ```

### Технические детали
- Контракты скомпилированы и находятся в `sources/output/staking`
  - stakeMasterAddress:`EQCf8e5CdnMCfdY-BGvWsiC-bKS3YK4aR9fGmHcpXoOb5OSE`
- Деплой выполнен со следующими параметрами:
  - jettonAddress: `EQDrqXZfdR-MqwAYImYkR0YHPDazMiI5-oUzaLxvuH4vM_J7`
  - nftAddress: `EQCliFZPd1xVOmzrN9Hx45SJX_fZd7DZsWQnNB4IMzoPp1f9`
  - feeAddress: `UQD6BJ0lgPp6AazF6-iP-HXRlgnvQUU04FBRq16dzvkJOJOm`

### Важно
- На `nftAddress` необходимо добавить адрес нового контракта в доверенные для обеспечения минта NFT при клейме
- Ссылка на тонскан: [tonscan.org](https://tonscan.org/address/EQCry-qC7OO1LrqtozRmUsdqkeQn7dxbghBZTPmWkjv4nw5q)

### Stage окружение
- URL: https://front.stage.bumpstore.app/
- Длительность стейка на stage установлена на 2 минуты
- Дополнительная 1 минута ожидания на стороне PHP бэкенда (не изменялась)

## Обновление контракта (11.02.2025)

### Добавлена поддержка старых стейков
- Добавлено хранение старых стейков в StakeMaster контракте:
  ```tact
  contract StakeMaster {
      old_stakes: map<Int, Cell>;  // Хранилище старых стейков
      ...
  }
  ```
- Добавлены новые методы для работы со старыми стейками:
  - `ClaimOldStake` - получение наград по старому стейку
  - `RestakeOldStake` - продление старого стейка
  - `get_old_stake_record` - получение информации о старом стейке

### Изменения в маршрутах
- Обновлены маршруты для поддержки старых стейков:
  - `/claim` - добавлена поддержка клейма для старых стейков
  - `/restake` - добавлена поддержка рестейка для старых стейков
  - `/stake/withdraw` - добавлена поддержка вывода для старых стейков

### Технические детали
- Новый контракт задеплоен по адресу: `EQBNUYkjRXqAGkYFVr3oufB7vtR-Hlm2W3F6ZidM2YBZ6WYi`
- Параметры деплоя:
  - jettonAddress: `EQDrqXZfdR-MqwAYImYkR0YHPDazMiI5-oUzaLxvuH4vM_J7`
  - nftAddress: `EQCliFZPd1xVOmzrN9Hx45SJX_fZd7DZsWQnNB4IMzoPp1f9`
  - feeAddress: `UQD6BJ0lgPp6AazF6-iP-HXRlgnvQUU04FBRq16dzvkJOJOm`

### Важно
- При миграции стейков на новый контракт все старые записи будут автоматически перенесены в `old_stakes`
- Пользователи со старыми стейками смогут продолжить использовать их через обновленные маршруты
- Все новые стейки будут создаваться и обрабатываться по новой схеме

## Обновление контракта (12.02.2025)
goodjob@gj:~/Documents/work/clearbump/tap/ton$ npx ts-node sources/contract.deploy_api.ts deploy-staking EQDrqXZfdR-MqwAYImYkR0YHPDazMiI5-oUzaLxvuH4vM_J7 EQCKGQTAGsDtuDJLXMPl3Oc-k7CRQ_WQz19HNYZwpcgRFxwy UQD6BJ0lgPp6AazF6-iP-HXRlgnvQUU04FBRq16dzvkJOJOm
Deploying contract to address:  EQA5DGoooKYBfvJzV1CWiyb6lvsslTcBoqnLamIPOEZSGTuo
Query ID:  7470622946926035088n
TxId:  5165426f480664d5e7279d487c3c6b3bc6a159fd8ce34fa3759b755db5e93c1d