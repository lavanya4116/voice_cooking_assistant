from fastapi import FastAPI 
from app.routes.voice import router as voice_router 

app=FastAPI() 

app.include_router(voice_router,prefix="/voice")

@app.get("/") 
def root():
    return {"message":"Voice Assistant Backend Running"}
