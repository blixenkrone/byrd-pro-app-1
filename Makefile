dev_build_docker_custom_tag:
	echo "building pro app with tag: ${tag}" \
	&& docker build --build-arg "env=${env}" --rm -f "Dockerfile" -t byrdapp/pro-app:${tag} . \
	&& docker push byrdapp/pro-app:${tag}

build_docker_tag:
	echo "building pro app with env/tag: ${env}" \
	&& docker build --build-arg "env=${env}" --rm -f "Dockerfile" -t byrdapp/pro-app:${env} . \
	&& docker push byrdapp/pro-app:${env}
