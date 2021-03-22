using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectHONEY.Domain.ModelArguments
{
    public class GetQuerieModel
    {
        public int page { get; set; }
        public string searchText { get; set; }
        public int pageSize { get; set; }
    }
}
