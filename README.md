# Getting Started with checkout backend

Checkout backend written in expressJS

## Usage

### Build project with docker
1. Grant execution permissions to **run.sh** and **docker_build.sh**
```bash
chmod +x run.sh
chmod +x docker_build.sh
```

2. Build project with docker
```bash
./docker_build.sh
```

3. Run backend with docker
```bash
./run.sh
```
Notes when building and running docker: copy the **.env** file from the root directory to the docker directory. The contents of this file are the same.