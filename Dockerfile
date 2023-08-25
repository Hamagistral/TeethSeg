FROM public.ecr.aws/lambda/python:3.10

RUN yum install -y ffmpeg libsm6 libxext6 libX11.so.6 libXext.x86_64 libXrender.x86_64 libXtst.x86_64 libSM libXrender mesa-libGL ffmpeg python3-opencv

# Install the function's dependencies using file requirements.txt
# from your project folder.
COPY model ./model

COPY helpers.py .
COPY meshsegnet.py .
COPY model.py .
COPY config.py .

COPY requirements.txt  .

RUN yum install -y gcc-c++

RUN pip install --no-cache-dir Cython numpy 
RUN pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Copy function code
COPY main.py ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "main.handler" ]