using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GenerateCLink : System.Web.UI.Page
{
    int Offer = 75416;
    string Link = "http://bricks.coupons.com/enable.asp?";
    string CheckCode = "MI";
    string sKey = "xm1ge0v3aq";
    string lKey = "oXEJCjPy7G9tbizsgk23UFZ1rOBmMu6NneAHSTKwxclW5v8L4qIdYaQhpDfVR";
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Write(BuildLink());
        Response.End();
    }
    public String BuildLink()
    {
        string SID= Session.SessionID;
        return String.Format("{0}o={1}&c={2}&p={3}&cpt={4}", Link, Offer, CheckCode, SID, EncodeCPT(SID, Offer, sKey, lKey));
    }
    /// Returns the encrypted pin code, offercode, short CipherKey and long CipherKey.
    /// <param name=”pinCode”>User’s unique identifier, as assigned by the client.</param>
    /// <param name=”offerCode”>Offer code for the coupon, as assigned by Coupons, Inc..</param>
    /// <param name=”shortKey”>Short CipherKey for the coupon, as assigned by Coupons, Inc..</param>
    /// <param name=”longKey”>Long CipherKey for the coupon, as assigned by Coupons, Inc..</param>
    /// <returns>An encrypted string, also known as the CPT parameter.</returns>
    public static string EncodeCPT(string pinCode, int offerCode, string shortKey, string longKey)
    {
        string decodeX = " abcdefghijklmnopqrstuvwxyz0123456789!$%()*+,-.@;<=>?[]^_{|}~";
        int[] encodeModulo;
        int[] vob;
        int ocode;

        encodeModulo = new int[256];
        vob = new int[2];
        if (offerCode.ToString().Length == 5)
            ocode = offerCode % 10000;
        else
            ocode = offerCode;
        vob[0] = ocode % 100;
        vob[1] = (ocode - vob[0]) / 100;
        for (int i = 0; i < 61; i++)
            encodeModulo[(int)char.Parse(decodeX.Substring(i, 1))] = i;
        pinCode = pinCode.ToLower() + offerCode.ToString();
        if (pinCode.Length < 20)
        {
            pinCode = pinCode + " couponsincproduction";
            pinCode = pinCode.Substring(0, 20);
        }
        int q = 0;
        int j = pinCode.Length;
        int k = shortKey.Length;
        int s1, s2, s3;
        System.Text.StringBuilder cpt = new System.Text.StringBuilder();
        for (int i = 0; i < j; i++)
        {
            s1 = encodeModulo[(int)char.Parse(pinCode.Substring(i, 1))];
            s2 = 2 * encodeModulo[(int)char.Parse(shortKey.Substring(i % k, 1))];
            s3 = vob[i % 2];
            q = (q + s1 + s2 + s3) % 61;
            cpt.Append(longKey.Substring(q, 1));
        }
        return cpt.ToString();
    }
}