using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AzureCalendarMvcWeb.Models
{
    /// <summary>
    /// ReturnMessages
    /// </summary>

    public class JsonReturnMessages
    {
        /// <summary>
        /// Gets or sets a value indicating whether this instance is success.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if this instance is success; otherwise, <c>false</c>.
        /// </value>

        public bool IsSuccess
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the MSG.
        /// </summary>
        /// <value>The MSG.</value>

        public string Msg
        {
            get;
            set;
        }


        /// <summary>
        /// Gets or sets the public key.
        /// </summary>
        /// <value>The public key.</value>

        public object Data
        {
            get;
            set;
        }
    }
}
