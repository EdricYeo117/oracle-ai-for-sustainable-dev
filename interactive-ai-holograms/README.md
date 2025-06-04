Source Code for the Interactive AI Holograms exhibit...

The exhibit can be run in a number of variations with source code directories corresponding...

- All Java using html frontend for speech capture that is part of app -  currently uses GCP speech AI
- All Python using mic that goes directly to python app - ie no browser frontend  - can use OCI or GCP speech AI
- Python with React and Express frontend for speech capture - can use OCI or GCP speech AI

The blog is
[here](https://www.linkedin.com/pulse/interactive-ai-holograms-develop-digital-double-oracle-paul-parkinson-zdpjf)

More video coming but [here is the original one](https://youtu.be/wNm1tXGOtx8)

Blog on how to set up the exhibit on a cloud compute instance is [here](https://www.linkedin.com/pulse/how-create-ultimate-ai-3d-spatial-xr-gaming-dev-design-paul-parkinson-kipge)


Source Code for the Interactive AI Holograms exhibit...
# Interactive AI Holograms

The exhibit can be run in a number of variations with source code directories corresponding...
Source code for the Interactive AI Holograms exhibit.

- All Java using html frontend for speech capture that is part of app -  currently uses GCP speech AI
- All Python using mic that goes directly to python app - ie no browser frontend  - can use OCI or GCP speech AI
- Python with React and Express frontend for speech capture - can use OCI or GCP speech AI
The exhibit can be run in several variations with corresponding folders:

The blog is
[here](https://www.linkedin.com/pulse/interactive-ai-holograms-develop-digital-double-oracle-paul-parkinson-zdpjf)
- **All Java** using an HTML frontend that captures speech (currently uses GCP Speech AI).
- **All Python** using a microphone that sends audio directly to the Python app (can use OCI or GCP Speech AI).
- **Python with React and Express** frontend for speech capture (can use OCI or GCP Speech AI).

More video coming but [here is the original one](https://youtu.be/wNm1tXGOtx8)
The blog is [here](https://www.linkedin.com/pulse/interactive-ai-holograms-develop-digital-double-oracle-paul-parkinson-zdpjf).
More video coming but [here is the original one](https://youtu.be/wNm1tXGOtx8).
Blog on how to set up the exhibit on a cloud compute instance is [here](https://www.linkedin.com/pulse/how-create-ultimate-ai-3d-spatial-xr-gaming-dev-design-paul-parkinson-kipge).

Blog on how to set up the exhibit on a cloud compute instance is [here](https://www.linkedin.com/pulse/how-create-ultimate-ai-3d-spatial-xr-gaming-dev-design-paul-parkinson-kipge)
## Prerequisites

1. **OCI account** with permissions to use AI Speech, Database, and Object Storage services.
2. **A10 GPU compute instance** (e.g., an OCI VM.GPU.A10 shape) for running Audio2Face and serving the application.
3. **SSL certificates** for secure WebSocket connections. Sample self‑signed certificates are provided under [`ssl/`](ssl).
4. **Oracle Database** with wallet credentials accessible by the application.

## Deployment overview

- **Speech‑to‑Text (STT)** – real‑time speech recognition via OCI AI Speech.
- **Text‑to‑Speech (TTS)** – synthesized responses using OCI AI Speech.
- **Audio2Face** – NVIDIA’s Audio2Face receives the TTS WAV file and animates the hologram avatar.
- **Database** – an Oracle Database is accessed through the Python and Java apps via `oracledb` to store prompts and generated SQL.

Each component communicates over REST or WebSocket endpoints configured in the source files.

## Running the Java variation

1. Edit [`java-version/env.properties`](java-version/env.properties) with your OCI configuration values.
2. In the `java-version` directory run:
   ```bash
   ./build_and_run.sh
   ```
   This builds the Maven project and launches the Spring Boot server on port `8080`.
3. Open `https://<your-host>:8080` in a browser. The HTML page captures audio and interacts with OCI services.

## Running the Python variation

1. Set the required environment variables (`COMPARTMENT_ID`, wallet paths, etc.). Example values are shown in [`aiholo.ps1`](aiholo.ps1).
2. From the repository root run:
   ```bash
   python python-realtimespeech-selectai/src/AIHoloRest.py
   ```
   This variation performs STT, generates a response, sends audio to Audio2Face and writes results to the database.

## Running the React/Express variation

1. Navigate to the `express-server` directory.
2. Install dependencies and build the client:
   ```bash
   npm run setup
   ```
3. Start both the Express server and the React client:
   ```bash
   npm start
   ```
   The React client runs on `http://localhost:4884` and the server on `https://localhost:8448` using the certificates from `ssl/`.
