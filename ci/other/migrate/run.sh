#!/bin/bash
set -e

INSTANCE_NAME_FROM=tap_db
INSTANCE_NAME_TO=stage
NEW_INSTANCE_TYPE=db-play2-nano
PRIVATE_NETWORK_ID=$(scw vpc private-network list name=stage -o template={{.ID}})
PRIVATE_NETWORK_CIDR=192.168.52.10/24
PASSWORD="Am4eP=ongoo7yie8Ziesoob8ci6ezo"
DB_USER=tap-user
DB_TAGS_FROM=prod
DB_TAGS_TO=stage


INSTANCE_ID_FROM=$(scw rdb instance list name=$INSTANCE_NAME_FROM tags.0=$DB_TAGS_FROM -o template={{.ID}})
echo "Instance id $INSTANCE_ID_FROM"

while [[ "$(scw rdb instance get $INSTANCE_ID_FROM -o template={{.Status}})" != "ready" ]]; do
  echo "Instance $INSTANCE_ID_FROM is not ready"
  sleep 5
done

SNAPSHOT_ID=$(scw rdb snapshot create instance-id=$INSTANCE_ID_FROM name=stage region=nl-ams -o template={{.ID}})
echo "Snapshot id $SNAPSHOT_ID"
while [[ "$(scw rdb snapshot get $SNAPSHOT_ID -o template={{.Status}})" != "ready" ]]; do
  echo "snapshot $SNAPSHOT_ID is not ready"
  sleep 5
done

echo "Snapshot ready"

OLD_INSTANCE_ID=$(scw rdb instance list name=$INSTANCE_NAME_TO tags.0=$DB_TAGS_TO -o template={{.ID}})
echo "remove old Instance"
scw rdb instance delete $OLD_INSTANCE_ID --wait

NEW_INSTANCE_ID=$(scw rdb snapshot restore "$SNAPSHOT_ID" instance-name=$INSTANCE_NAME_TO is-ha-cluster=false node-type=$NEW_INSTANCE_TYPE -o template={{.ID}})

while [[ "$(scw rdb instance get "$NEW_INSTANCE_ID" -o template={{.Status}})" != "ready" ]]; do
  echo "New instance $NEW_INSTANCE_ID is not ready"
  sleep 5
done

echo "Remove prod tag from $NEW_INSTANCE_ID"
scw rdb instance update $NEW_INSTANCE_ID tags.0=stage

echo "Remove snapshot  $SNAPSHOT_ID"
scw rdb snapshot delete $SNAPSHOT_ID

PUBLIC_ENDPOINT_ID=$(scw rdb endpoint list $NEW_INSTANCE_ID -o template={{.ID}} )

scw rdb endpoint create $NEW_INSTANCE_ID private-network.private-network-id=$PRIVATE_NETWORK_ID \
  private-network.service-ip=$PRIVATE_NETWORK_CIDR --wait
echo "Created endpoint"

echo "Delete public endpoint $PUBLIC_ENDPOINT_ID"
scw rdb endpoint delete $PUBLIC_ENDPOINT_ID instance-id=$NEW_INSTANCE_ID --wait

scw rdb user update instance-id=$NEW_INSTANCE_ID name=$DB_USER password=$PASSWORD
echo "Update password"
