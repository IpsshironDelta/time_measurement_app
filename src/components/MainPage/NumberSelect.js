import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">個数を選択</InputLabel>
        <Select
          id           = {props.id}
          value        = {props.value}
          label        = {props.label}
          defaultValue = {props.defaultValue}
          onChange     = {props.onChange}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="13">13</MenuItem>
            <MenuItem value="14">14</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="17">17</MenuItem>
            <MenuItem value="18">18</MenuItem>
            <MenuItem value="19">19</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="21">21</MenuItem>
            <MenuItem value="22">22</MenuItem>
            <MenuItem value="23">23</MenuItem>
            <MenuItem value="24">24</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="26">26</MenuItem>
            <MenuItem value="27">27</MenuItem>
            <MenuItem value="28">28</MenuItem>
            <MenuItem value="29">29</MenuItem>
            <MenuItem value="30">30</MenuItem>
            <MenuItem value="31">31</MenuItem>
            <MenuItem value="32">32</MenuItem>
            <MenuItem value="33">33</MenuItem>
            <MenuItem value="34">34</MenuItem>
            <MenuItem value="35">35</MenuItem>
            <MenuItem value="36">36</MenuItem>
            <MenuItem value="37">37</MenuItem>
            <MenuItem value="38">38</MenuItem>
            <MenuItem value="39">39</MenuItem>
            <MenuItem value="40">40</MenuItem>
            <MenuItem value="41">41</MenuItem>
            <MenuItem value="42">42</MenuItem>
            <MenuItem value="43">43</MenuItem>
            <MenuItem value="44">44</MenuItem>
            <MenuItem value="45">45</MenuItem>
            <MenuItem value="46">46</MenuItem>
            <MenuItem value="47">47</MenuItem>
            <MenuItem value="48">48</MenuItem>
            <MenuItem value="49">49</MenuItem>
            <MenuItem value="50">50</MenuItem>
            <MenuItem value="51">51</MenuItem>
            <MenuItem value="52">52</MenuItem>
            <MenuItem value="53">53</MenuItem>
            <MenuItem value="54">54</MenuItem>
            <MenuItem value="55">55</MenuItem>
            <MenuItem value="56">56</MenuItem>
            <MenuItem value="57">57</MenuItem>
            <MenuItem value="58">58</MenuItem>
            <MenuItem value="59">59</MenuItem>
            <MenuItem value="60">60</MenuItem>
            <MenuItem value="61">61</MenuItem>
            <MenuItem value="62">62</MenuItem>
            <MenuItem value="63">63</MenuItem>
            <MenuItem value="64">64</MenuItem>
            <MenuItem value="65">65</MenuItem>
            <MenuItem value="66">66</MenuItem>
            <MenuItem value="67">67</MenuItem>
            <MenuItem value="68">68</MenuItem>
            <MenuItem value="69">69</MenuItem>
            <MenuItem value="70">70</MenuItem>
            <MenuItem value="71">71</MenuItem>
            <MenuItem value="72">72</MenuItem>
            <MenuItem value="73">73</MenuItem>
            <MenuItem value="74">74</MenuItem>
            <MenuItem value="75">75</MenuItem>
            <MenuItem value="76">76</MenuItem>
            <MenuItem value="77">77</MenuItem>
            <MenuItem value="78">78</MenuItem>
            <MenuItem value="79">79</MenuItem>
            <MenuItem value="80">80</MenuItem>
            <MenuItem value="81">81</MenuItem>
            <MenuItem value="82">82</MenuItem>
            <MenuItem value="83">83</MenuItem>
            <MenuItem value="84">84</MenuItem>
            <MenuItem value="85">85</MenuItem>
            <MenuItem value="86">86</MenuItem>
            <MenuItem value="87">87</MenuItem>
            <MenuItem value="88">88</MenuItem>
            <MenuItem value="89">89</MenuItem>
            <MenuItem value="90">90</MenuItem>
            <MenuItem value="91">91</MenuItem>
            <MenuItem value="92">92</MenuItem>
            <MenuItem value="93">93</MenuItem>
            <MenuItem value="94">94</MenuItem>
            <MenuItem value="95">95</MenuItem>
            <MenuItem value="96">96</MenuItem>
            <MenuItem value="97">97</MenuItem>
            <MenuItem value="98">98</MenuItem>
            <MenuItem value="99">99</MenuItem>
            <MenuItem value="100">100</MenuItem>
            <MenuItem value="101">101</MenuItem>
            <MenuItem value="102">102</MenuItem>
            <MenuItem value="103">103</MenuItem>
            <MenuItem value="104">104</MenuItem>
            <MenuItem value="105">105</MenuItem>
            <MenuItem value="106">106</MenuItem>
            <MenuItem value="107">107</MenuItem>
            <MenuItem value="108">108</MenuItem>
            <MenuItem value="109">109</MenuItem>
            <MenuItem value="110">110</MenuItem>
            <MenuItem value="111">111</MenuItem>
            <MenuItem value="112">112</MenuItem>
            <MenuItem value="113">113</MenuItem>
            <MenuItem value="114">114</MenuItem>
            <MenuItem value="115">115</MenuItem>
            <MenuItem value="116">116</MenuItem>
            <MenuItem value="117">117</MenuItem>
            <MenuItem value="118">118</MenuItem>
            <MenuItem value="119">119</MenuItem>
            <MenuItem value="120">120</MenuItem>
            <MenuItem value="121">121</MenuItem>
            <MenuItem value="122">122</MenuItem>
            <MenuItem value="123">123</MenuItem>
            <MenuItem value="124">124</MenuItem>
            <MenuItem value="125">125</MenuItem>
            <MenuItem value="126">126</MenuItem>
            <MenuItem value="127">127</MenuItem>
            <MenuItem value="128">128</MenuItem>
            <MenuItem value="129">129</MenuItem>
            <MenuItem value="130">130</MenuItem>
            <MenuItem value="131">131</MenuItem>
            <MenuItem value="132">132</MenuItem>
            <MenuItem value="133">133</MenuItem>
            <MenuItem value="134">134</MenuItem>
            <MenuItem value="135">135</MenuItem>
            <MenuItem value="136">136</MenuItem>
            <MenuItem value="137">137</MenuItem>
            <MenuItem value="138">138</MenuItem>
            <MenuItem value="139">139</MenuItem>
            <MenuItem value="140">140</MenuItem>
            <MenuItem value="141">141</MenuItem>
            <MenuItem value="142">142</MenuItem>
            <MenuItem value="143">143</MenuItem>
            <MenuItem value="144">144</MenuItem>
            <MenuItem value="145">145</MenuItem>
            <MenuItem value="146">146</MenuItem>
            <MenuItem value="147">147</MenuItem>
            <MenuItem value="148">148</MenuItem>
            <MenuItem value="149">149</MenuItem>
            <MenuItem value="150">150</MenuItem>
            <MenuItem value="151">151</MenuItem>
            <MenuItem value="152">152</MenuItem>
            <MenuItem value="153">153</MenuItem>
            <MenuItem value="154">154</MenuItem>
            <MenuItem value="155">155</MenuItem>
            <MenuItem value="156">156</MenuItem>
            <MenuItem value="157">157</MenuItem>
            <MenuItem value="158">158</MenuItem>
            <MenuItem value="159">159</MenuItem>
            <MenuItem value="160">160</MenuItem>
            <MenuItem value="161">161</MenuItem>
            <MenuItem value="162">162</MenuItem>
            <MenuItem value="163">163</MenuItem>
            <MenuItem value="164">164</MenuItem>
            <MenuItem value="165">165</MenuItem>
            <MenuItem value="166">166</MenuItem>
            <MenuItem value="167">167</MenuItem>
            <MenuItem value="168">168</MenuItem>
            <MenuItem value="169">169</MenuItem>
            <MenuItem value="170">170</MenuItem>
            <MenuItem value="171">171</MenuItem>
            <MenuItem value="172">172</MenuItem>
            <MenuItem value="173">173</MenuItem>
            <MenuItem value="174">174</MenuItem>
            <MenuItem value="175">175</MenuItem>
            <MenuItem value="176">176</MenuItem>
            <MenuItem value="177">177</MenuItem>
            <MenuItem value="178">178</MenuItem>
            <MenuItem value="179">179</MenuItem>
            <MenuItem value="180">180</MenuItem>
            <MenuItem value="181">181</MenuItem>
            <MenuItem value="182">182</MenuItem>
            <MenuItem value="183">183</MenuItem>
            <MenuItem value="184">184</MenuItem>
            <MenuItem value="185">185</MenuItem>
            <MenuItem value="186">186</MenuItem>
            <MenuItem value="187">187</MenuItem>
            <MenuItem value="188">188</MenuItem>
            <MenuItem value="189">189</MenuItem>
            <MenuItem value="190">190</MenuItem>
            <MenuItem value="191">191</MenuItem>
            <MenuItem value="192">192</MenuItem>
            <MenuItem value="193">193</MenuItem>
            <MenuItem value="194">194</MenuItem>
            <MenuItem value="195">195</MenuItem>
            <MenuItem value="196">196</MenuItem>
            <MenuItem value="197">197</MenuItem>
            <MenuItem value="198">198</MenuItem>
            <MenuItem value="199">199</MenuItem>
            <MenuItem value="200">200</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
