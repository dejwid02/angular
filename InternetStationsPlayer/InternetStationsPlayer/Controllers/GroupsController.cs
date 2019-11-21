using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InternetStationsPlayer.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InternetStationsPlayer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        public GroupsController(IStationsRepository repository)
        {
            Repository = repository;
        }

        [HttpGet]
        public ActionResult<IList<StationsGroup>> GetGroups()
        {
            var groups = Repository.GetGroups();
            return Ok(groups);
        }

        public IStationsRepository Repository { get; }
    }
}