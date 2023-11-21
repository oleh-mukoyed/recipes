openapi-generator-cli generate \
    -i http://host.docker.internal:3000/api-json \
    --generator-name typescript-axios \
    -o /local/out \
    --additional-properties=useSingleRequestParameter=true