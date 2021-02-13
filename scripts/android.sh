set -e
# rm -rf ~/.gradle/daemon && cd android && ./gradlew clean && cd ..
if [ $2 == "release" ]; then
    if [ $1 == "staging" ]; then
      cd android && ENVFILE=.myapp.staging.env ./gradlew assembleMyappStagingRelease && cd ..
    elif [ $1 == "prod" ]; then
        cd android  && ENVFILE=.myapp.production.env ./gradlew bundleMyappProductionRelease && cd ..
    fi
elif [ $2 == "debug" ]; then
    if [ $1 == "staging" ]; then
      cd android && ENVFILE=.myapp.staging.env ./gradlew installMyappStagingRelease && cd .. 
    elif [ $1 == "prod" ]; then
        cd android  && ENVFILE=.myapp.production.env ./gradlew bundleMyappProductionRelease && cd ..
    fi
fi

