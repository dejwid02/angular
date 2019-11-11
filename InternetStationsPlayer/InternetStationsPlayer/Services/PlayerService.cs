using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace InternetStationsPlayer.Services
{
    public class PlayerService : IPlayerService
    {
        [DllImport("User32.dll")]
        static extern int SetForegroundWindow(IntPtr point);
        [DllImport("user32.dll")]

        public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, IntPtr dwExtraInfo);

        private const string playerPath = @"C:\Program Files (x86)\VideoLAN\VLC\vlc.exe";
        private Process process;

        public void VolumeDown()
        {
            IntPtr h = process.MainWindowHandle;
            SetForegroundWindow(h);
            int key = 40;
            const int KEYEVENTF_KEYUP = 0x0002;
            keybd_event((byte)key, 0, 0, IntPtr.Zero);
            keybd_event((byte)key, 0, KEYEVENTF_KEYUP, IntPtr.Zero);
        }

        public void VolumeUp()
        {
            IntPtr h = process.MainWindowHandle;
            SetForegroundWindow(h);
            int key = 38;
            const int KEYEVENTF_KEYUP = 0x0002;
            keybd_event((byte)key, 0, 0, IntPtr.Zero);
            keybd_event((byte)key, 0, KEYEVENTF_KEYUP, IntPtr.Zero);
        }

        public void PlayStream(string url)
        {
            if (process!= null)
            {
                Stop();
            }
            process = System.Diagnostics.Process.Start(playerPath, url);

        }

        public void Stop()
        {
            process.Kill();
            process = null;
        }

    }
}
