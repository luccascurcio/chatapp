import { Router } from "express";
import Chat from './db/models/Chat.js'
import Channel from './db/models/Channel.js'

const routes = new Router();

//POST ROUTE FOR CHAT
routes.post("/chat", async (request, response) => {
    
  try {
      const chat = await Chat.create(request.body)
      response.send(chat);
    } catch (error) {
      response.status(500).send(error);
    }
});

//GET ROUTE FOR CHAT
routes.get("/chat/:channel", async (request, response) => {
    const { channel } = request.params;
    const chat = await Chat.find({channel: channel});
  
    try {
      response.json(chat);
    } catch (error) {
      response.status(500).send(error);
    }
  });

//GET ROUTE FOR CHANNELS
routes.get("/channel", async (request, response) => {
  let channels = await Channel.find({});

  //TEMPORARY FUNCTION - add default channels on the first query.
  if (channels.length === 0) {

    await Channel.create({id: '1', name: 'Channel 1'})
    await Channel.create({id: '2', name: 'Channel 2'})
    await Channel.create({id: '3', name: 'Channel 3'})
    await Channel.create({id: '4', name: 'Channel 4'})

    channels = await Channel.find({});
  }

  try {
    response.json(channels);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default routes;