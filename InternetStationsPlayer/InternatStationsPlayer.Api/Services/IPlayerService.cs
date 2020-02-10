using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetStationsPlayer.Services
{
    public interface IPlayerService
    {
        void PlayStream(string url);
        void Stop();
        void VolumeUp();
        void VolumeDown();
    }
}
