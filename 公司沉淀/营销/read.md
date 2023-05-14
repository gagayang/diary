1、遇到@slardar/cli导致依赖安装失败，可以降低slardar的警告级别：export SLARDARCLI_SKIP_ERROR=1

2、关于ab测的思考，方案1是实验平台通过圈定特定用户群的uid，然后比如2/8开的方式给用户打标给到后端，后端吐给前端对应的标识（flag），前端在代码中写if else，这里存在一个问题，测完后不要的代码怎么办。

方案2是通过对应的平台，比如公司的gecko平台对版本进行控制，然后对新旧版本的前端代码做ab分流实验，这样代码干净，存在一个问题，如果这个实验要做十天半个月，下一个版本要上线，怎么办，下个版本只能参与这个实验，并且如果有逻辑耦合，可能还的再开实验组。存在的问题是下一位研发不知道上一位正在参与ab实验，导致被迫参与实验都不知情

关于这个if else的判断逻辑，大部分情况前端 后端在做这些实验的时候，实验结束都不会去删除这些代码，万一哪天实验又重开呢，还有一个问题，这些实验的配置就应该放到一个平台去管理

那么ab测有没有好的解决办法？




scm编译产物莫名其妙多了一个产物：https://lf-cdn-tos.bytescm.com/obj/static/living_room_campaign/pages/webpack-stats-reports-1683613141345.mp.gz

https://cloud.bytedance.net/scm-cdn/log/4454633，

同样的commit，前几天没有，最近几天就出现了，是因为这个产物是scm编译后会上传到maive平台，然后再删除这个分析包，但是现在maive平台停用，这个gz产物得不到删除。解决办法是这个项目aec.config.ts配置maive：false


代码冻结后怎么改动bug发布?

fix的分支往火车自动创建的release分支提MR，手动合并，再次运行火车流水线
