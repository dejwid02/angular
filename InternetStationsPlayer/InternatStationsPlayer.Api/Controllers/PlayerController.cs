using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InternetStationsPlayer.DAL;
using InternetStationsPlayer.Services;
using Microsoft.AspNetCore.Mvc;

namespace InternetStationsPlayer.Controllers
{
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService playerService;
        private readonly IStationsRepository repository;

        public PlayerController(IPlayerService playerService, IStationsRepository repository)
        {
            this.playerService = playerService;
            this.repository = repository;
        }

        [HttpGet("play/{stationId:int}")]
        public IActionResult Play(int stationId)
        {
            var url = repository.GetStation(stationId).Url;
            playerService.PlayStream(url);
            return Ok();
        }

        [HttpGet("stop")]
        public IActionResult Stop(int stationId)
        {

            playerService.Stop();
            return Ok();
        }

        [HttpGet("volumeup")]
        public IActionResult VolumeUp()
        {

            playerService.VolumeUp();
            return Ok();
        }

        [HttpGet("volumedown")]
        public IActionResult VolumeDown()
        {

            playerService.VolumeDown();
            return Ok();
        }
    }
}