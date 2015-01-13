#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

psql $1 -f ../../db/tables/users.sql
psql $1 -f ../../db/tables/prizes.sql
psql $1 -f ../../db/tables/images.sql
psql $1 -f ../../db/tables/tags.sql
psql $1 -f ../../db/tables/prizes_tags.sql
psql $1 -f ../../db/tables/friendships.sql


psql $1 -f ../../db/functions/add_prize.sql
psql $1 -f ../../db/functions/nuke_prize.sql
psql $1 -f ../../db/functions/show_prize.sql
psql $1 -f ../../db/functions/query_prizes.sql
