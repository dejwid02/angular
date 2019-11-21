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

        [HttpPost]
        public ActionResult<StationsGroup> AddGroup(StationsGroup group)
        {
            var groups = Repository.GetGroups();
            var id = groups.Max(g => g.Id);
            group.Id = id + 1;
            groups.Add(group);
            Repository.SaveGroups(groups);
            return Ok(group);
        }

        [HttpDelete]
        public ActionResult<IList<StationsGroup>> DeleteGroup(StationsGroup group)
        {
            var groups = Repository.GetGroups();
            groups = groups.Where(g=> g.Id != group.Id).ToList();
            Repository.SaveGroups(groups);
            return Ok();
        }

        public IStationsRepository Repository { get; }
    }
}