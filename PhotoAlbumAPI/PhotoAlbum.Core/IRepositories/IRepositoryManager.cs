﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhotoAlbum.Core.IRepositories
{
    public interface IRepositoryManager
    {
        Task SaveAsync();
    }
}
