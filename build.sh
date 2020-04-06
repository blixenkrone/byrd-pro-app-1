#! bin/sh
DOCKER_TAGS=([1]="local" [2]="dev" [3]="prod")

for i in "${DOCKER_TAGS[@]}"; do
    echo "building docker env $i"
    docker build --build-arg env=$i --rm -f "Dockerfile" -t byrdapp/pro-app:$i .
done

for j in "${DOCKER_TAGS[@]}"; do
    echo "pushing docker env $j"
    docker push byrdapp/pro-app:$j
done

echo "done building and pushing docker tags"
