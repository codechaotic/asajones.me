#!/bin/bash

app_name=$MODULUS_PROJECT
app_type=$MODULUS_TYPE
servo_size=$MODULUS_SIZE
build_dir=$BUILD_DIR

PROJECTS=`modulus project list | tail -n+4 | cut -d" " -f1`
# Ensure project exists
if ! [[ ${PROJECTS[*]} =~ $app_name ]]
  then modulus project create -r $app_type -s $servo_size $app_name;
fi

ADDONS=`modulus addons list -p $app_name | tail -n+7 | grep - -A1 | grep -v -`
echo $ADDONS
# Ensure database addon exists
if ! [[ ${ADDONS[*]} =~ "Mongo" ]]
  then echo 4 | modulus addons add -p $app_name mongo:base
else
  echo 'Mongo instance exists'
fi

modulus project deploy -p $app_name $build_dir
